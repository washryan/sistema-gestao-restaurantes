package com.restaurante.interfaces;

import com.restaurante.application.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
  private final AnalyticsService analyticsService;

  @Autowired
  public AnalyticsController(AnalyticsService analyticsService) {
    this.analyticsService = analyticsService;
  }

  @GetMapping("/daily-sales")
  public ResponseEntity<Map<String, Object>> getDailySalesReport() {
    return ResponseEntity.ok(analyticsService.getDailySalesReport());
  }

  @GetMapping("/popular-items")
  public ResponseEntity<List<Map<String, Object>>> getPopularItems() {
    return ResponseEntity.ok(analyticsService.getPopularItems());
  }
}
