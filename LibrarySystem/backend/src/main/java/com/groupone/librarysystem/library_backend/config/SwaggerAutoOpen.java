package com.groupone.librarysystem.library_backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.awt.Desktop;
import java.net.URI;

/**
 * 自動打開 Swagger 設定
 */
@Component
public class SwaggerAutoOpen {

    private static final Logger logger = LoggerFactory.getLogger(SwaggerAutoOpen.class);

    @Value("${IS_DOCKER:false}")
    private boolean isDocker;

    @EventListener(ApplicationReadyEvent.class)
    public void openSwagger() {

        if (isDocker) {
            return;
        }

        try {
            if (Desktop.isDesktopSupported()) {
                Desktop.getDesktop().browse(new URI("http://localhost:8080/swagger-ui.html"));
            }
        }
        catch (Exception e) {

            logger.error("Failed to open Swagger UI in browser", e);
        }
    }
}
