import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "./utils";

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: (taskId, isDone) => {
      customFetch.patch(`/${taskId}`, { isDone: isDone });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    ,
    onError: (error) => console.log('Error')
  })

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask(item.id, !item.isDone)}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        onClick={() => console.log('delete task')}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
