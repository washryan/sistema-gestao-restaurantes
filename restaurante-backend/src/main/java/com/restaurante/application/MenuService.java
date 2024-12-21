package com.restaurante.application;

import com.restaurante.domain.MenuItem;
import com.restaurante.infrastructure.persistence.JpaMenuItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
  private static final Logger logger = LoggerFactory.getLogger(MenuService.class);
  private final JpaMenuItemRepository menuItemRepository;

  @Autowired
  public MenuService(JpaMenuItemRepository menuItemRepository) {
    this.menuItemRepository = menuItemRepository;
  }

  public List<MenuItem> getAllMenuItems() {
    logger.info("Fetching all menu items");
    return menuItemRepository.findAll();
  }

  public MenuItem addMenuItem(MenuItem menuItem) {
    logger.info("Adding new menu item: {}", menuItem.getName());
    return menuItemRepository.save(menuItem);
  }
}