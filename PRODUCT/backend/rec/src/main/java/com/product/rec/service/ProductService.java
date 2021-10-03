package com.product.rec.service;

import com.product.rec.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    public ProductDTO getProduct(Long productId) throws Exception;
    public List<ProductDTO> getAllProducts() throws Exception;
    public Long addProduct(ProductDTO product) throws Exception;
    public void updateProduct(Long productId,ProductDTO productDTO) throws Exception;
    public void deleteProduct(Long productId) throws Exception;
}
