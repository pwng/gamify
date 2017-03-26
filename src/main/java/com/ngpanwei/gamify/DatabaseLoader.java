/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.leanms.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final ResourceRepository repository;

	@Autowired
	public DatabaseLoader(ResourceRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {

		this.repository.save(new Resource("Frodo", "Baggins", "ring bearer"));
		this.repository.save(new Resource("Bilbo", "Baggins", "burglar"));
		this.repository.save(new Resource("Gandalf", "the Grey", "wizard"));
		this.repository.save(new Resource("Samwise", "Gamgee", "gardener"));
		this.repository.save(new Resource("Meriadoc", "Brandybuck", "pony rider"));
		this.repository.save(new Resource("Peregrin", "Took", "pipe smoker"));
	}
}
