// tableView/_ws/useTablesWS.ts
import { useEffect, useRef } from "react";
import { TableWSPayload } from "./types";

interface UseTablesWSOptions {
    onConnectionEstablished?: (data: any) => void;
    onMergeTable?: (data: any) => void;
    onResetTable?: (data: any) => void;
    onEnterTable?: (data: any) => void;
    onOrderUpdate?: (data: any) => void;
    onError?: (data: any) => void;
}

// 🚨 [핵심 수정] Vite 개발 환경에서는 프록시를 타기 위해 현재 host를 사용하고, 빌드(운영) 환경에서는 환경 변수를 사용합니다.
const WS_BASE_URL = import.meta.env.DEV
  ? `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`
  : (import.meta.env.VITE_BASE_URL || "").replace(/^http/, "ws").replace(/\/$/, "");

export const useTablesWS = (options: UseTablesWSOptions = {}) => {
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        let isMounted = true;

        const connect = () => {
            // URL 설정 (개발 환경 프록시를 통해 쿠키가 자동으로 전송됩니다.)
            const wsUrl = `${WS_BASE_URL}/ws/django/booth/tables/`;
            
            console.log(`[WS:Tables] 🔄 연결 시도 중... URL: ${wsUrl}`);

            const socket = new WebSocket(wsUrl);
            wsRef.current = socket;

            socket.onopen = () => {
                console.log(`[WS:Tables] 🟢 연결 성공! (readyState: ${socket.readyState})`);
            };

            socket.onmessage = (event) => {
                if (!isMounted) return;
                try {
                    const payload: TableWSPayload = JSON.parse(event.data);
                    console.debug("[WS:Tables] 📩 메시지 수신:", payload);

                    switch (payload.type) {
                        case "connection_established":
                            options.onConnectionEstablished?.(payload.data);
                            break;
                        case "merge_table":
                            options.onMergeTable?.(payload.data);
                            break;
                        case "reset_table":
                            options.onResetTable?.(payload.data);
                            break;
                        case "enter_table":
                            options.onEnterTable?.(payload.data);
                            break;
                        case "order_update":
                            options.onOrderUpdate?.(payload.data);
                            break;
                        case "ERROR":
                            console.error("[WS:Tables] ❌ 서버 응답 에러:", payload.data);
                            options.onError?.(payload.data);
                            break;
                        default:
                            console.warn("[WS:Tables] ⚠️ 알 수 없는 타입 수신:", payload);
                    }
                } catch (error) {
                    console.error("[WS:Tables] 💥 메시지 파싱 에러 (JSON 형식이 아님):", error, event.data);
                }
            };

            socket.onclose = (event) => {
                console.log(
                    `[WS:Tables] ⚪ 연결 종료. Code: ${event.code}, Reason: '${event.reason || "없음"}', Clean: ${event.wasClean}`
                );

                if (isMounted && event.code !== 4001) {
                    console.log("[WS:Tables] ⏳ 3초 후 재연결을 시도합니다...");
                    reconnectTimeoutRef.current = window.setTimeout(connect, 3000);
                } else if (event.code === 4001) {
                    console.error("[WS:Tables] 🚨 인증 실패(4001)로 인해 재연결을 시도하지 않습니다. (쿠키 만료 등)");
                }
            };

            socket.onerror = (error) => {
                console.error("[WS:Tables] 🔴 소켓 에러 발생!:", error);
            };
        };

        connect();

        return () => {
            isMounted = false;
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
            if (wsRef.current) {
                console.log("[WS:Tables] 🧹 컴포넌트 언마운트 - 소켓 연결을 정리합니다.");
                wsRef.current.close();
                wsRef.current = null;
            }
        };
    }, []); 

    return { socket: wsRef.current };
};