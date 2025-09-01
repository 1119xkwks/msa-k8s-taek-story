package com.example.fileservice.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.propagation.TextMapSetter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignTracingConfig {

    private static final TextMapSetter<RequestTemplate> OTEL_REQUEST_TEMPLATE_SETTER = new TextMapSetter<RequestTemplate>() {
        @Override
        public void set(RequestTemplate carrier, String key, String value) {
            if (carrier == null || key == null || value == null) {
                return;
            }
            carrier.header(key, value);
        }
    };

    @Bean
    public RequestInterceptor otelTracePropagationInterceptor() {
        return (RequestTemplate template) ->
                GlobalOpenTelemetry.get()
                        .getPropagators()
                        .getTextMapPropagator()
                        .inject(Context.current(), template, OTEL_REQUEST_TEMPLATE_SETTER);
    }
}


