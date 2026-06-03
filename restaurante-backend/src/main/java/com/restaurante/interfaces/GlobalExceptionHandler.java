package com.restaurante.interfaces;

import com.restaurante.interfaces.payload.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidationException(
      MethodArgumentNotValidException exception,
      HttpServletRequest request) {
    String message = exception.getBindingResult().getFieldErrors().stream()
        .findFirst()
        .map(error -> error.getField() + ": " + error.getDefaultMessage())
        .orElse("Invalid request");

    return buildResponse(HttpStatus.BAD_REQUEST, message, request);
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException exception, HttpServletRequest request) {
    return buildResponse(HttpStatus.BAD_REQUEST, exception.getMessage(), request);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleException(Exception exception, HttpServletRequest request) {
    return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected server error", request);
  }

  private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String message, HttpServletRequest request) {
    return ResponseEntity
        .status(status)
        .body(new ErrorResponse(status.value(), status.getReasonPhrase(), message, request.getRequestURI()));
  }
}
