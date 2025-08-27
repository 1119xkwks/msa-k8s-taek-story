package com.example.userservice.model;

import com.google.gson.Gson;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendRequestPayload {
	String key;
	String type;
	Long userSeq1;
	Long userSeq2;
	String ip;

	public static FriendRequestPayload fromJson(String json) {
		Gson gson = new Gson();
		return gson.fromJson(json, FriendRequestPayload.class);
	}

	@Override
	public String toString() {
		Gson gson = new Gson();
		return gson.toJson(this);
	}
}
