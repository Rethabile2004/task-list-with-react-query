import { useQuery, useQueryClient } from '@tanstack/react-query';
import SingleItem from './SingleItem';
import { customFetch } from './utils';
const Items = ({ items }) => {

    const {data,isLoading,isError,error}=useQuery({
      queryKey:['tasks'],
      queryFn:async()=>{
        const {data}=await customFetch.get('/');
        return data;
      }
    })

    if(isLoading){
      return<p>Loading...</p>
    }
    if(isError){
      return <p>{error.message}</p>
    }
    console.log(data.taskList);
    
  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
