package com.product.rec.service.impl;

import com.google.common.collect.Iterables;
import com.product.rec.dto.ProductDTO;
import com.product.rec.entity.Product;
import com.product.rec.repository.ProductRepository;
import com.product.rec.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service(value="productService")
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductDTO getProduct(Long productId) throws Exception {
        Optional<Product> optional = productRepository.findById(productId);
        Product product = optional.orElseThrow(() -> new Exception("Service.PRODUCT_NOT_FOUND"));
        ProductDTO productDTO = new ProductDTO();
        productDTO.setProductId(product.getProductId());
        productDTO.setDescription(product.getDescription());
        productDTO.setProductName(product.getProductName());
        productDTO.setProductPrice(product.getProductPrice());
        productDTO.setProductAvailability(product.getProductAvailability());
        return productDTO;
    }

    @Override
    public List<ProductDTO> getAllProducts() throws Exception {
        Iterable<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        if(Iterables.size(products)>0) {
            products.forEach(product -> {
                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductId(product.getProductId());
                productDTO.setDescription(product.getDescription());
                productDTO.setProductName(product.getProductName());
                productDTO.setProductPrice(product.getProductPrice());
                productDTO.setProductAvailability(product.getProductAvailability());
                productDTOS.add(productDTO);
            });
        }
        if (productDTOS.isEmpty())
            throw new Exception("Service.PRODUCTS_NOT_FOUND");
        return productDTOS;
    }

    @Override
    public Long addProduct(ProductDTO product) throws Exception {
        Product productEntity = new Product();
        productEntity.setDescription(product.getDescription());
        productEntity.setProductAvailability(product.getProductAvailability());
        productEntity.setProductName(product.getProductName());
        productEntity.setProductPrice(product.getProductPrice());
        Product savedProduct = productRepository.save(productEntity);
        return savedProduct.getProductId();
    }

    @Override
    public void updateProduct(Long productId,ProductDTO productDTO) throws Exception {
        Optional<Product> product = productRepository.findById(productId);
        Product productToUpdate = product.orElseThrow(()->new Exception("Service.PRODUCT_NOT_FOUND"));
        productToUpdate.setDescription(productDTO.getDescription());
        productToUpdate.setProductAvailability(productDTO.getProductAvailability());
        productToUpdate.setProductName(productDTO.getProductName());
        productToUpdate.setProductPrice(productDTO.getProductPrice());
    }

    @Override
    public void deleteProduct(Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);
        Product productToDelete = product.orElseThrow(()->new Exception("Service.PRODUCT_NOT_FOUND"));
        productRepository.deleteById(productId);
    }
}
