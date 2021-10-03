package com.product.rec.controller;

import com.product.rec.dto.ProductDTO;
import com.product.rec.service.ProductService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/product")
@Api(tags = "API for Products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private Environment environment;


    @GetMapping(value="/getProducts")
    public List<ProductDTO> getAllProducts() throws Exception {
        return productService.getAllProducts();
    }

    @GetMapping(value="/getProduct/{productId}")
    public ProductDTO getProduct(@PathVariable Long productId) throws Exception{
        return productService.getProduct(productId);
    }

    @PostMapping(value = "/addNewProduct",produces = "application/json")
    public ResponseEntity<String> saveProduct(@RequestBody ProductDTO product) throws Exception{
        Long productId = productService.addProduct(product);
        String successMessage = environment.getProperty("API.INSERT_SUCCESS") + productId;
        return new ResponseEntity<>(successMessage,HttpStatus.CREATED);
    }

    @PutMapping(value = "/updateProduct/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable Long productId,@RequestBody ProductDTO productDTO) throws Exception{
        productService.updateProduct(productId, productDTO);
        String successMessage = environment.getProperty("API.UPDATE_SUCCESS");
        return new ResponseEntity<>(successMessage, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteProduct/{productId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long productId) throws Exception {
        productService.deleteProduct(productId);
        String successMessage = environment.getProperty("API.DELETE_SUCCESS");
        return new ResponseEntity<>(successMessage, HttpStatus.OK);
    }

}
