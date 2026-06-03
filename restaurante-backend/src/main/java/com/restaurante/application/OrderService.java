package com.restaurante.application;

import com.restaurante.domain.Order;
import com.restaurante.domain.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
  private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
  private final OrderRepository orderRepository;
  private final SimpMessagingTemplate messagingTemplate;
  private final InventoryService inventoryService;

  @Autowired
  public OrderService(OrderRepository orderRepository, SimpMessagingTemplate messagingTemplate,
      InventoryService inventoryService) {
    this.orderRepository = orderRepository;
    this.messagingTemplate = messagingTemplate;
    this.inventoryService = inventoryService;
  }

  @Transactional
  public Order createOrder(Order order) {
    logger.info("Creating new order");
    order.setOrderTime(LocalDateTime.now());
    order.setStatus("PENDING");
    Order savedOrder = orderRepository.save(order);
    logger.info("Order created with ID: {}", savedOrder.getId());

    inventoryService.updateInventoryFromOrder(savedOrder);

    messagingTemplate.convertAndSend("/topic/orders", savedOrder);

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

  public List<Order> getAllOrders() {
    logger.info("Fetching all orders");
    return orderRepository.findAll();
  }

  public Order updateOrderStatus(Long id, String status) {
    Order order = getOrder(id);
    order.setStatus(status);
    Order updatedOrder = orderRepository.save(order);
    messagingTemplate.convertAndSend("/topic/orders", updatedOrder);
    return updatedOrder;
  }
}
