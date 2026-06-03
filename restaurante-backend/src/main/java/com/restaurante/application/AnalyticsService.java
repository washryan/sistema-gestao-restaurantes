package com.restaurante.application;

import com.restaurante.domain.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {
  private final OrderRepository orderRepository;

  @Autowired
  public AnalyticsService(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  public Map<String, Object> getDailySalesReport() {
    LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
    LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);

    List<Object[]> results = orderRepository.getDailySalesData(startOfDay, endOfDay);
    if (results.isEmpty() || results.get(0) == null) {
      Map<String, Object> emptyReport = new HashMap<>();
      emptyReport.put("totalOrders", 0L);
      emptyReport.put("totalRevenue", 0);
      emptyReport.put("averageOrderValue", 0);
      return emptyReport;
    }

    Map<String, Object> report = new HashMap<>();
    Object[] row = results.get(0);
    report.put("totalOrders", row[0] != null ? row[0] : 0L);
    report.put("totalRevenue", row[1] != null ? row[1] : 0);
    report.put("averageOrderValue", row[2] != null ? row[2] : 0);

    return report;
  }

  public List<Map<String, Object>> getPopularItems() {
    return orderRepository.getPopularItems();
  }

  public List<Map<String, Object>> getRevenueByCategory() {
    return orderRepository.getRevenueByCategory();
  }
}
