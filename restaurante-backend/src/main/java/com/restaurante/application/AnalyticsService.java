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

    Map<String, Object> report = new HashMap<>();
    report.put("totalOrders", results.get(0)[0]);
    report.put("totalRevenue", results.get(0)[1]);
    report.put("averageOrderValue", results.get(0)[2]);

    return report;
  }

  public List<Map<String, Object>> getPopularItems() {
    return orderRepository.getPopularItems();
  }
}
