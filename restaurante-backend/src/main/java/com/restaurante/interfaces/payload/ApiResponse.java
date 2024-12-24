package com.restaurante.interfaces.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
  private Boolean success;
  private String message;

  public ApiResponse(boolean success, String message) {
    this.success = success;
    this.message = message;
  }
}
