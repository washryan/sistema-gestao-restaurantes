package com.restaurante.interfaces;

import com.restaurante.application.OrderService;
import com.restaurante.domain.Order;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Orders", description = "API para gerenciamento de pedidos")
public class OrderController {
  private final OrderService orderService;

  @Autowired
  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping
  @Operation(summary = "Criar um novo pedido", description = "Cria um novo pedido e retorna o pedido criado")
  public Order createOrder(@RequestBody Order order) {
    return orderService.createOrder(order);
  }

  @GetMapping
  @Operation(summary = "Listar pedidos", description = "Retorna todos os pedidos cadastrados")
  public List<Order> getAllOrders() {
    return orderService.getAllOrders();
  }

  @GetMapping("/{id}")
  @Operation(summary = "Obter um pedido", description = "Retorna um pedido específico com base no ID fornecido")
  public Order getOrder(@PathVariable Long id) {
    return orderService.getOrder(id);
  }

  @PutMapping("/{id}/status")
  @Operation(summary = "Atualizar status", description = "Atualiza o status de um pedido")
  public Order updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
    return orderService.updateOrderStatus(id, payload.get("status"));
  }
}
