package com.ajay.notes_management.services;

import com.ajay.notes_management.entity.Note;
import com.ajay.notes_management.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note saveNote(Note note) {
        return noteRepository.save(note);
    }
    public void deleteNote(Long id) {
    noteRepository.deleteById(id);
}
    public Note updateNote(Long id, Note updatedNote) {

    Note existingNote = noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Note not found"));

    existingNote.setTitle(updatedNote.getTitle());
    existingNote.setDescription(updatedNote.getDescription());

    return noteRepository.save(existingNote);
}
}