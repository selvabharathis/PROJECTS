package com.product.rec.dto;


import lombok.Data;

@Data
public class ProductDTO {

    private Long productId;
    private Long productAvailability;
    private String description;
    private String productName;
    private Long productPrice;

}
