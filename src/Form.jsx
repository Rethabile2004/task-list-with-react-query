import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { customFetch } from './utils';
import { toast } from 'react-toastify';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (newTitle) => {
      customFetch.post('/', { title: newTitle });
    },
    onSuccess: () => { toast.success('Item added'); queryClient.invalidateQueries({ queryKey: ['tasks'] }); },
    onError: (error) => {
      toast.error(error.message); console.log(error);
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName)
    // createItem(newItemName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn' disabled={isPending}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
