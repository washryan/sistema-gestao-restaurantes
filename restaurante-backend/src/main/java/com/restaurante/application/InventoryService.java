package com.restaurante.application;

import com.restaurante.domain.InventoryItem;
import com.restaurante.domain.InventoryItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
  private static final Logger logger = LoggerFactory.getLogger(InventoryService.class);
  private final InventoryItemRepository inventoryItemRepository;

  @Autowired
  public InventoryService(InventoryItemRepository inventoryItemRepository) {
    this.inventoryItemRepository = inventoryItemRepository;
  }

  public List<InventoryItem> getAllInventoryItems() {
    logger.info("Fetching all inventory items");
    return inventoryItemRepository.findAll();
  }

  public InventoryItem updateInventoryItem(InventoryItem item) {
    logger.info("Updating inventory item: {}", item.getName());
    return inventoryItemRepository.save(item);
  }
}