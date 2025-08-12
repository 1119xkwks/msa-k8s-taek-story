package com.example.userservice.common;

import jakarta.servlet.http.HttpServletRequest;

public class CommonUtil {
	public static String getClientIp(HttpServletRequest req) {
		String xff = req.getHeader("X-Forwarded-For");
		if (xff != null && !xff.isBlank()) {
			return xff.split(",")[0].trim(); // 가장 앞이 원 IP
		}
		String xri = req.getHeader("X-Real-IP");
		if (xri != null && !xri.isBlank()) return xri;
		return req.getRemoteAddr();
	}
}
