package com.example.userservice.model;

import com.google.gson.Gson;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostingEventPayload {
	String key;
	String type;
	Long userSeq;
	List<Long> friendSeqs;
	String ip;

	public static PostingEventPayload fromJson(String json) {
		Gson gson = new Gson();
		return gson.fromJson(json, PostingEventPayload.class);
	}

	@Override
	public String toString() {
		Gson gson = new Gson();
		return gson.toJson(this);
	}
}
