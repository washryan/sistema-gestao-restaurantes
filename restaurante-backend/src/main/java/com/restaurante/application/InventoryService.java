package com.restaurante.application;

import com.restaurante.domain.InventoryItem;
import com.restaurante.domain.InventoryItemRepository;
import com.restaurante.domain.Order;
import com.restaurante.domain.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
  private final InventoryItemRepository inventoryItemRepository;

  @Autowired
  public InventoryService(InventoryItemRepository inventoryItemRepository) {
    this.inventoryItemRepository = inventoryItemRepository;
  }

  public void updateInventoryFromOrder(Order order) {
    for (MenuItem item : order.getItems()) {
      InventoryItem inventoryItem = inventoryItemRepository.findByName(item.getName())
          .orElseThrow(() -> new RuntimeException("Inventory item not found"));

      inventoryItem.setQuantity(inventoryItem.getQuantity() - 1);
      inventoryItemRepository.save(inventoryItem);
    }
  }

  public List<InventoryItem> getAllInventoryItems() {
    return inventoryItemRepository.findAll();
  }

  public InventoryItem updateInventoryItem(InventoryItem item) {
    return inventoryItemRepository.save(item);
  }
}
