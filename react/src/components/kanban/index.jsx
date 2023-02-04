import './kanban.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from '../../mockData'
import { useState } from 'react'
import Card from '../card'
import { Button, TextField, Dialog, DialogActions, DialogContent, 
DialogContentText, DialogTitle, Autocomplete } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react'
import axios from 'axios'


const Kanban = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingRemove, setLoadingRemove] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [users, setUsers] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('ToDo')
    const [editsectionID, setEditSectionID] = useState()
    const [edittaskID, setEditTaskID] = useState()
    const [assignUsers, setAssignUsers] = useState()
    const [details, setDetails] = useState()


    const getToken = () => localStorage.getItem('token')
    const getUser = () => localStorage.getItem('id')
    const baseUrl = 'http://127.0.0.1:8000/api/'

    useEffect(()=>{
        const config = {
            method: 'get',
            url: `${baseUrl}tasksbyuser/${getUser()}`,
            headers: { 
              'Authorization': `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            },
            data : data
          };
        const getData = async () => {
            try {
              const res = await axios(config)
              const users = await axios.get(`${baseUrl}users`)
              setData(res.data.data)
              setUsers(users.data)
            } catch (err) {
              alert(err)
            }
          }
          getData()
        }, [])


    const onDragEnd = result => {
        if (!result.destination) return
        const { source, destination } = result


        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask

            setData(data)
            console.log(result)
            console.log('taskId',result.draggableId,'Edit status',destinationCol.id)
            changeStatusHandler(result.draggableId,destinationCol.id)
        }
    }

    const changeStatusHandler = (id,status) => {
        const editStatus = JSON.stringify({
            "status": status,
          });
        const config = {
            method: 'put',
            url: `${baseUrl}tasks/${id}`,
            headers: { 
              'Authorization': `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            },
            data : editStatus
          };
        const postData = async () => {
            try {
              const res = await axios(config)
                console.log(res.data)
            } catch (err) {
              alert(err)
            }
          }
          postData()
    }

  
      const handleSaveNewTask = () => {
        setLoadingAdd(true)
        const newTask = JSON.stringify({
            "title": title,
            "description": description,
            "status": status,
            "user_id": assignUsers
          });
        const config = {
            method: 'post',
            url: `${baseUrl}tasks`,
            headers: { 
              'Authorization': `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            },
            data : newTask
          };
        const postData = async () => {
            try {
              const res = await axios(config)
              let list = [...data];
              const index = data.findIndex(item => item.id === status);
              list[index].tasks = [...list[index].tasks, {
                    "id": res.data.id,
                    "title": res.data.title,
                    "description": res.data.description
                }]
                setData(list)
                setOpen(false);
                setLoadingAdd(false)
            } catch (err) {
              alert(err)
            }
          }
          postData()
      };

    const handleClickOpen = (sectionId) => {
        setOpen(true);
        setStatus(sectionId)
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleCloseDetails = () => {
        setOpenDetails(false);
      };

      const titleChangeHandler = (e) => {
        setTitle(e.target.value)
      };

      const descriptionChangeHandler = (e) => {
        setDescription(e.target.value)
      };

      const handleRmoveTask = (taskId,sectionId) => {
        setLoadingRemove(true)
        const config = {
            method: 'delete',
            url: `${baseUrl}tasks/${taskId}`,
            headers: { 
              'Authorization': `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            },
          };
        const removeData = async () => {
            try {
              const res = await axios(config)
              let list = [...data];
              const index = data.findIndex(item => item.id === sectionId);
              const remove = list[index]
              const taskIndex = remove.tasks.findIndex(task => task.id === taskId)
              remove.tasks.splice(taskIndex,1)
                setData(list)
               setLoadingRemove(false)

            } catch (err) {
              alert(err)
            }
          }
          removeData()
      }

      const handleDetailTask = (taskId,sectionID) => {
        setEditTaskID(taskId)
        setEditSectionID(sectionID)
        const config = {
            method: 'get',
            url: `${baseUrl}tasks/${taskId}`,
            headers: { 
              'Authorization': `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            },
            data : data
          };
        const getData = async () => {
            try {
              const res = await axios(config)
              console.log(res.data)
              setDetails(res.data)
              setOpenDetails(true)
            } catch (err) {
              alert(err)
            }
          }
          getData()
      }

      const handleEditTask = () => {
        setLoadingEdit(true)
        const editTask = JSON.stringify({
            "title": title,
            "description": description,
            "status": details.status,
            "user_id": assignUsers
          });
        const config = {
            method: 'put',
            url: `${baseUrl}tasks/${details.id}`,
            headers: { 
              'Authorization': `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            },
            data : editTask
          };
        const postData = async () => {
            try {
              const res = await axios(config)
              let list = [...data];
              const index1 = data.findIndex(item => item.id === editsectionID);
              const remove = list[index1]
              const taskIndex = remove.tasks.findIndex(task => task.id === edittaskID)
              remove.tasks.splice(taskIndex,1)
              const index = data.findIndex(item => item.id === editsectionID);
              list[index].tasks = [...list[index].tasks, {
                    "id": edittaskID,
                    "title": title,
                    "description": description
                }]
                setData(list)
                setOpenDetails(false);
                setLoadingEdit(false)
            } catch (err) {
              alert(err)
            }
          }
          postData()
      }


    return (
         <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    data.map(section => (
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className='kanban__section'
                                    ref={provided.innerRef}
                                >
                                    
                                    <div className="kanban__section__title">
                                        {section.id}
                                    </div>
                                    <LoadingButton
                                    sx={{ mt: 1, mb: 1, mr:1 }}
                                    variant='outlined'
                                    color='success'
                                    type='submit'
                                    loading={loadingAdd}
                                    onClick={()=>handleClickOpen(section.id)}
                                    >
                                    add
                                    </LoadingButton>                               
                                    <div className="kanban__section__content">
                                        {
                                            section.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id.toString()}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.5' : '1'
                                                            }}
                                                        >                               
                                                            <Card>
                                                                {task.title}<br/>
                                                                {task.description} <br/>
                                                                <LoadingButton
                                                                sx={{ mt: 3, mb: 2, mr:1 }}
                                                                variant='outlined'
                                                                color='error'
                                                                type='submit'
                                                                loading={loadingRemove}
                                                                onClick={()=>handleRmoveTask(task.id,section.id)}
                                                                >
                                                                delete
                                                                </LoadingButton>
                                                                <LoadingButton
                                                                sx={{ mt: 3, mb: 2, mr:1  }}
                                                                variant='outlined'
                                                                color='warning'
                                                                type='submit'
                                                                loading={loadingEdit}
                                                                onClick={()=>handleEditTask(task.id,section.id)}
                                                                >
                                                                Edit
                                                                </LoadingButton>
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Task Title"
                        fullWidth
                        variant="standard"
                        onChange={titleChangeHandler}
                    />
                    <TextField  
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                        onChange={descriptionChangeHandler}
                    /><br/>
                    <Autocomplete
                    disablePortal
                    id="users"
                    getOptionLabel={(users)=> ` ${users.name}  `}
                    options={users}
                    onChange={(event, newValue) => {
                        setAssignUsers(newValue.id);
                        }} 
                    renderInput={(params) => <TextField {...params} label="Assign User" />}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                    sx={{ mt: 3, mb: 2 }}
                    variant='outlined'
                    color='success'
                    type='submit'
                    loading={loading}
                    onClick={handleSaveNewTask}
                    >
                    Save
                    </LoadingButton>
                    </DialogActions>
                </Dialog>    
                <Dialog open={openDetails} onClose={handleCloseDetails}>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Task Title"
                        fullWidth
                        variant="standard"
                        defaultValue={details?.title}
                        onChange={titleChangeHandler}
                    />
                    <TextField  
                        margin="dense"
                        // multiline   minRows={3} maxRows={5}
                        id="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                        defaultValue={details?.description}
                        onChange={descriptionChangeHandler}
                    /><br/>
                    <Autocomplete
                    disablePortal
                    id="users"
                    getOptionLabel={(users)=> ` ${users.name}  `}
                    options={users}
                    onChange={(event, newValue) => {
                        setAssignUsers(newValue.id);
                        }} 
                    renderInput={(params) => <TextField {...params} label="Assign User" />}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseDetails}>Cancel</Button>
                    <LoadingButton
                    sx={{ mt: 3, mb: 2 }}
                    variant='outlined'
                    color='success'
                    type='submit'
                    loading={loadingEdit}
                    onClick={handleEditTask}
                    >
                    Edit
                    </LoadingButton>
                    </DialogActions>
                </Dialog>             
            </div>
        </DragDropContext>
    )
}

export default Kanban