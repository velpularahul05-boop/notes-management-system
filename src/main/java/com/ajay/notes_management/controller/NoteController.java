package com.ajay.notes_management.controller;

import com.ajay.notes_management.entity.Note;
import com.ajay.notes_management.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @PostMapping
    public Note saveNote(@RequestBody Note note) {
        return noteService.saveNote(note);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
    noteService.deleteNote(id);
    return ResponseEntity.noContent().build();
}
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id,
           @RequestBody Note note) {

        return noteService.updateNote(id, note);
}
}