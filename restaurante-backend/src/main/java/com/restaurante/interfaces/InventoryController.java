package com.restaurante.interfaces;

import com.restaurante.application.InventoryService;
import com.restaurante.domain.InventoryItem;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@Tag(name = "Inventory", description = "API para gerenciamento de estoque")
public class InventoryController {
  private final InventoryService inventoryService;

  @Autowired
  public InventoryController(InventoryService inventoryService) {
    this.inventoryService = inventoryService;
  }

  @GetMapping
  @Operation(summary = "Listar todos os itens do estoque", description = "Retorna uma lista de todos os itens disponíveis no estoque")
  public List<InventoryItem> getAllInventoryItems() {
    return inventoryService.getAllInventoryItems();
  }

  @PutMapping
  @Operation(summary = "Atualizar um item do estoque", description = "Atualiza um item do estoque e retorna o item atualizado")
  public InventoryItem updateInventoryItem(@RequestBody InventoryItem item) {
    return inventoryService.updateInventoryItem(item);
  }
}