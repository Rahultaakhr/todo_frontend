import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Typography } from "@material-tailwind/react";

function Home() {

  const [content, setContent] = useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [allTodos, setAllTodos] = useState([])

  const changeStatus = async (_id, currentStatus) => {
    try {
      await axios.post("/api/todo/update", {
        _id,
        isCompleted: !currentStatus,
      });
    } catch (error) {
      console.log(error.message);
    }
    fetchAllTodos();
  };

  const createTask = async () => {
    await axios.post("/api/todo/create", {
      content
    })
    setContent("")
    fetchAllTodos()
  }
  const fetchAllTodos = async () => {
    const response = await axios.get("/api/todo/all").then((res) => res.data.data)
    setAllTodos(response)

  }
  const deleteTodo = async (_id) => {
    await axios.post("/api/todo/delete", {
      _id
    })
    fetchAllTodos()
  }

  useEffect(() => {

    fetchAllTodos()
  }, [])
  return (
    <div className=" w-full h-screen max-h-full flex items-center justify-center bg-[#EDE4FF]">


      <div className=" w-[90%] h-[500px] rounded-xl md:h-[600px] max-h-[600px] bg-white max-w-[500px] relative flex flex-col items-center justify-start">
        <div className=" absolute">

          <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h4" color="blue-gray">
                  Add Task
                </Typography>

                <Input label="Task" size="lg" value={content} onChange={(e) => { setContent(e.target.value) }} />
              </CardBody>
              <CardFooter className="pt-0">
                <Button onClick={() => {
                  handleOpen()
                  createTask()
                }} className="bg-[#A076F9]" fullWidth

                >
                  Add
                </Button>
              </CardFooter>
            </Card>
          </Dialog>
        </div>

        <Button className=" absolute top-[-15px]   bg-[#A076F9] w-[200px]" onClick={handleOpen}>
          Add Task
        </Button>

        {
          allTodos?.length > 0 ? <div className=" w-[90%] flex-1 mt-10 overflow-y-scroll scrollbar-none">
            <ul>
              {
                allTodos.map((todo, index) => (
                  <li key={index} className=" flex items-center justify-between my-2 h-auto shadow-lg p-2 rounded-lg">
                    <button disabled={todo?.isCompleted} onClick={() => changeStatus(todo._id, todo.isCompleted)}> {todo?.isCompleted ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-regular fa-circle"></i>}</button>
                    <p className=" text-wrap px-2">{todo?.content}</p>
                    <span onClick={() => { deleteTodo(todo._id) }}><i className="fa-solid fa-trash cursor-pointer"></i></span>
                  </li>
                ))
              }

            </ul>
          </div> :
            <div className=" w-full h-full flex items-center justify-center">
              <p>please add some tasks</p>
            </div>
        }
      </div>
    </div>
  )
}

export default Home