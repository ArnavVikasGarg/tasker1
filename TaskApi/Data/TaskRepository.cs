using System;
using System.Collections.Generic;
using System.Linq;
using TaskApi.Models;

namespace TaskApi.Data
{
    public class TaskRepository
    {
        private readonly List<TaskItem> _tasks = new();

        public IEnumerable<TaskItem> GetAll() => _tasks;

        public TaskItem? GetById(Guid id) => _tasks.FirstOrDefault(t => t.Id == id);

        public void Add(TaskItem task) => _tasks.Add(task);

        public bool Update(Guid id, TaskItem updated)
        {
            var existing = GetById(id);
            if (existing == null) return false;
            existing.Description = updated.Description;
            existing.IsCompleted = updated.IsCompleted;
            return true;
        }

        public bool Delete(Guid id)
        {
            var task = GetById(id);
            if (task == null) return false;
            _tasks.Remove(task);
            return true;
        }
    }
}