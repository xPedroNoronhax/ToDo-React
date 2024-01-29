
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    // the propertie selectedProjectId, first will receive undefined as a value, to represent there´s no project created;
    // when the user want to add a new project, selectedProjectId will receive null.
    // the main value will be a id, for when the project already created, we can identfied then for an id will be given.
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  const handleAddTask = (text) => {
    setProjectsState((prevState) => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId:prevState.selectedProjectId,
        id: taskId,
      };

      return{
        ...prevState,
        tasks: [newTask,...prevState.tasks]
      }
    })
  }

  const handleDeleteTask = (id) => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task)=> task.id !== id),
      }
    });
  }

  const handleStartAddProject = () => {
    //this function will maintain the preview state of the projects, but when the button was clicked, selectedProjectId will change for null, wich means that a project will be created, and the page will render for the NewProject component.
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  const handleSelectProject = (id) => {
    // this function will direct the user for the project tha was clicked in the sidebar
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  const handleAddProject = (projectData) => {
    setProjectsState((prevState) => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId
      };

      return{
        ...prevState,
        selectedProjectId:undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  const handleCancelAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }

  const handleDeleteProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project)=> project.id !== prevState.selectedProjectId),
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);


  let content = <SelectedProject 
  project={selectedProject}
   onDelete={handleDeleteProject} 
   onAddTask={handleAddTask} 
   onDeleteTask={handleDeleteTask}
   tasks={projectsState.tasks}
   />;

  if(projectsState.selectedProjectId === null)
{
  content = <NewProject onAdd={handleAddProject} onCancel = {handleCancelAddProject} />
} else if (projectsState.selectedProjectId === undefined){
  content = <NoProjectSelected onStartAddProject={handleStartAddProject}  />
}
  return (
    <main className="h-screen my-8 flex gap-8">
      {/*
      projects={projectsState.projects} will show on the sidebar every project that will be created in the app.
      */}
      <ProjectsSideBar 
      onStartAddProject={handleStartAddProject} 
      projects={projectsState.projects} 
      onSelectProject={handleSelectProject}
      selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
