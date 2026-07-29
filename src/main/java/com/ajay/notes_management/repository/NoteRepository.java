package com.ajay.notes_management.repository;

import com.ajay.notes_management.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

}