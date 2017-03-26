package com.leanms.appointment;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.leanms.appointment.HomeController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/**
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class ResourceAPITests {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void should_return_profile() throws Exception {
        mockMvc.perform((get("/api/profile/resources")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.alps.version",is("1.0")))
                .andExpect(jsonPath("$.alps.descriptors",hasSize(7)))
                .andDo(print());
    }

    @Test
    public void should_return_resources() throws Exception {
        mockMvc.perform((get("/api/resources")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.resources",hasSize(6)))
                .andDo(print());
    }
    @Test
    public void should_create_resources() throws Exception {

    }
}
