package com.product.rec.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productid")
    private Long productId;

    @Column(name = "AVAILABLEQUANTITY")
    private Long productAvailability;

    private String description;

    @Column(name = "productName")
    private String productName;

    @Column(name = "PRODUCT_PRICE") //or product_name or ProductName
    private Long productPrice;

}

