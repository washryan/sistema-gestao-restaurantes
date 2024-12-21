package com.restaurante.application;

import com.restaurante.domain.Order;
import com.restaurante.domain.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {
  private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
  private final OrderRepository orderRepository;

  @Autowired
  public OrderService(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  public Order createOrder(Order order) {
    logger.info("Creating new order");
    order.setOrderTime(LocalDateTime.now());
    order.setStatus("PENDING");
    Order savedOrder = orderRepository.save(order);
    logger.info("Order created with ID: {}", savedOrder.getId());
    return savedOrder;
  }

  public Order getOrder(Long id) {
    logger.info("Fetching order with ID: {}", id);
    return orderRepository.findById(id)
        .orElseThrow(() -> {
          logger.error("Order not found with ID: {}", id);
          return new RuntimeException("Order not found");
        });
  }
}
