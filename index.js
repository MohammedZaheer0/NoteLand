document.addEventListener("DOMContentLoaded", function () {
    let NoteLand = document.getElementById("noteland");
    let Notes = document.getElementById("notes");
    let Uppernotland = document.getElementById("uppernotland");

    //10 seconds of delay for the content invisable
         setTimeout(() => {
        let Ptag = document.getElementById("noteland");
        Ptag.parentNode.removeChild(Ptag);
    }, 10000);
    // clearTimeout(SetTime);
    

    // Notes will be invisable in the begining
    Notes.style.display = "none";

    // When we click on anywhere in the  body then the NoteLand will be invisable
    let Body = document.getElementById("body");
    Body.addEventListener("click", function () {
        NoteLand.style.display = "none";
        Uppernotland.style.display = "none";
        Notes.style.display = "flex";
    });

    let NewNotesBtn = document.getElementById("newnotes");
    let RightDiv = document.getElementById("right");
    let OriginalContente = RightDiv.innerHTML;

    let Quantity = 0;
    let Number = document.getElementById("number");
    let ShowContent = document.getElementById("showcontentall");

    // Load data from localStorage on page load
    let storedData = localStorage.getItem("Data");
    if (storedData) {
        let data = JSON.parse(storedData);
        data.forEach(item => {
            createNoteElement(item.Title, item.Content);
            Quantity += 1;
        });
        Number.textContent = Quantity;
    }

    // NewNotesBtn for Adding new notes
    NewNotesBtn.addEventListener("click", function () {
        while (RightDiv.hasChildNodes()) {
            RightDiv.removeChild(RightDiv.firstChild);
        }

        // Creating New elements when we click on NewNotesBtn
        let Box = document.createElement("div");
        RightDiv.appendChild(Box);
        Box.classList.add("rightdiv");
        Box.setAttribute("class", "rightdiv");

        let Xmark = document.createElement("img");
        Xmark.setAttribute("style", "height:20px;width:20px;position:absolute;right:0px;top:0px;margin:5px 10px 20px 20px");
        Xmark.src = "icons8-cross-30.png";
        Xmark.classList.add("boximage");
        Box.appendChild(Xmark);

        let Title = document.createElement("input");
        Title.classList.add("title");
        Title.setAttribute("id", "title");
        Title.setAttribute("placeholder", "Note Title");
        Box.appendChild(Title);

        let NoteDescription = document.createElement("textarea");
        NoteDescription.setAttribute("placeholder", "Note Description");
        NoteDescription.classList.add("content");
        NoteDescription.setAttribute("id", "notedes");
        Box.appendChild(NoteDescription);

        let SaveNoteHere = document.createElement("button");
        SaveNoteHere.classList.add("savebutton");
        SaveNoteHere.setAttribute("id", "setNoteHere");
        SaveNoteHere.textContent = "SAVE NOTE HERE!";
        Box.appendChild(SaveNoteHere);

        Xmark.addEventListener("click", function () {
            Box.style.display = "none";
            RightDiv.innerHTML = OriginalContente;
        });


        // SaveNoteHere Starts here by clicking
        SaveNoteHere.addEventListener("click", function () {
            let InnerContent = document.createElement("div");
            ShowContent.appendChild(InnerContent);
            InnerContent.setAttribute("id", "InnerContent");

            let InnerT = document.createElement("h3");
            InnerT.setAttribute("id", "InnerT");

            let InnerP = document.createElement("p");
            InnerP.setAttribute("id", "InnerP");

            let DeleteBtn = document.createElement("button");
            DeleteBtn.setAttribute("id", "DeleteBtn");
            DeleteBtn.textContent = "Delete";

            InnerContent.appendChild(InnerT);
            InnerContent.appendChild(InnerP);
            InnerContent.appendChild(DeleteBtn);
            InnerT.textContent = Title.value;
            InnerP.textContent = NoteDescription.value;

            if (Title.value == "" || Title.value == null) {
                alert("Please Enter Title");
                InnerContent.style.display = "none";
            } else if (NoteDescription.value == "" || NoteDescription.value == null) {
                alert("Please Enter Content");
                InnerContent.style.display = "none";
            } else {
                Title.value = "";
                NoteDescription.value = "";

                Box.style.display = "none";
                RightDiv.innerHTML = OriginalContente;

                let Store = localStorage.getItem("Data") || "[]";
                Store = JSON.parse(Store);

                let ExisitingData = Store.findIndex(item => item.Title === InnerT.innerHTML);
                if (ExisitingData !== -1) {
                    Store[ExisitingData].Content = InnerP.innerHTML;
                } else {
                    Store.push({
                        Title: InnerT.innerHTML,
                        Content: InnerP.innerHTML,
                        Task: [],
                        UniqueId: Math.floor(Math.random() * 100)
                    });
                }
                localStorage.setItem("Data", JSON.stringify(Store));
            }

            // Delete the InnerContent when delete button is clicked
            DeleteBtn.addEventListener("click", function () {
                InnerContent.style.display = "none";

                Quantity = ShowContent.children.length;
                Number.textContent = Quantity;
        
                if (Quantity > 0) {
                    let StoreData = localStorage.getItem("Data");
                    if (StoreData) {
                        let data = JSON.parse(StoreData);
                        let index = data.findIndex(item => item.Title === InnerT.innerHTML);
                        if (index !== -1) {
                            data.splice(index, 1);
                            localStorage.setItem("Data", JSON.stringify(data));
                        }
                    }
                }
            });

            ShowContent.appendChild(InnerContent);
            Number.textContent = ShowContent.children.length;
            

        });

    });


    // Function to create note elements
    function createNoteElement(title, content) {
        let InnerContent = document.createElement("div");
        ShowContent.appendChild(InnerContent);
        InnerContent.setAttribute("id", "InnerContent");

        let InnerT = document.createElement("h3");
        InnerT.setAttribute("id", "InnerT");

        let InnerP = document.createElement("p");
        InnerP.setAttribute("id", "InnerP");

        let DeleteBtn = document.createElement("button");
        DeleteBtn.setAttribute("id", "DeleteBtn");
        DeleteBtn.textContent = "Delete";

        InnerContent.appendChild(InnerT);
        InnerContent.appendChild(InnerP);
        InnerContent.appendChild(DeleteBtn);
        InnerT.textContent = title;
        InnerP.textContent = content;

        DeleteBtn.addEventListener("click", function() {
            InnerContent.style.display = "none";
            if (Quantity > 0) {
                Quantity -= 1;
                Number.textContent = Quantity;

                let StoreData = localStorage.getItem("Data");
                if (StoreData) {
                    let data = JSON.parse(StoreData);
                    let index = data.findIndex(item => item.Title === title);
                    if (index !== -1) {
                        data.splice(index, 1);
                        localStorage.setItem("Data", JSON.stringify(data));
                    }
                }
            }
        });


        InnerContent.addEventListener("click",function(){

            while (RightDiv.hasChildNodes()) {
                RightDiv.removeChild(RightDiv.firstChild);
            }
            
            let OuterMainDiv = document.createElement("div");
            RightDiv.appendChild(OuterMainDiv);
            // OuterMainDiv.classList.add("OuterMainDiv");
            OuterMainDiv.setAttribute("id","OuterMainDiv");
            OuterMainDiv.classList.add("rightdiv");

            let NavDiv = document.createElement("div");
            NavDiv.classList.add("OuterNav");
            OuterMainDiv.appendChild(NavDiv);

            let NavTitle = document.createElement("h2");
            NavTitle.classList.add("NavTitle");
            NavDiv.appendChild(NavTitle);
            NavTitle.innerHTML = InnerT.textContent;

            
            let NewTask = document.createElement("p");
            NewTask.classList.add("NewTask");
            NavDiv.appendChild(NewTask);
            NewTask.textContent = "New Task";


            let DeleteAllNotes = document.createElement("p");
            DeleteAllNotes.classList.add("DeleteAllNotes");
            NavDiv.appendChild(DeleteAllNotes);
            DeleteAllNotes.textContent = "Delete All Notes";


            let X = document.createElement("img");
            X.setAttribute("style", "height:15px;width:15px;position:absolute;right:0px;top:0px;margin:28px 7px 0px 5px");
            X.src = "icons8-cross-30.png";
            X.classList.add("X");
            NavDiv.appendChild(X);


            let ContentDiv = document.createElement("div");
            ContentDiv.classList.add("ContentDiv");
            OuterMainDiv.appendChild(ContentDiv);

            let ContentDivContent = document.createElement("h3");
            ContentDivContent.classList.add("ContentDivContent");
            ContentDivContent.textContent = InnerP.textContent;
            ContentDiv.appendChild(ContentDivContent);

            let TaskList = document.createElement("h2");
            TaskList.classList.add("TaskList");
            TaskList.textContent = "Task List";
            ContentDiv.appendChild(TaskList);



            NewTask.addEventListener("click",function(){
            while (RightDiv.hasChildNodes()) {
                RightDiv.removeChild(RightDiv.firstChild);
            }                       
            let InnerTaskDiv = document.createElement("div");
            InnerTaskDiv.classList.add("InnerTaskDiv");    

            RightDiv.appendChild(InnerTaskDiv);
            InnerTaskDiv.classList.add("rightdiv");

            let TaskDiv = document.createElement("div");
            TaskDiv.classList.add("TaskDiv");
            InnerTaskDiv.appendChild(TaskDiv);

            let TaskData = document.createElement("input");
            TaskData.classList.add("TaskData");
            TaskData.setAttribute("placeholder","Enter Task Name");
            TaskDiv.appendChild(TaskData);

            let CreateTaskBtn = document.createElement("button");
            CreateTaskBtn.classList.add("CreateTaskBtn");
            CreateTaskBtn.textContent  = "Create Task";
            TaskDiv.appendChild(CreateTaskBtn);

            CreateTaskBtn.addEventListener("click",function(){
                if(TaskData.value == '' || TaskData.value == null){
                    alert("Task Name Can't Be Empty");    /*one more thing should be add here later*/
                }
                else{

                    while (RightDiv.hasChildNodes()) {
                        RightDiv.removeChild(RightDiv.firstChild);
                    }  
                    RightDiv.appendChild(OuterMainDiv);
                    OuterMainDiv.classList.add("rightdiv");

                    let StoreData = localStorage.getItem("Data");
                    let data = StoreData ? JSON.parse(StoreData) :  [];

                    let index = data.findIndex(item => item.Title === InnerT.textContent && item.Content === InnerP.textContent);

                    if (index !== -1) {
                        let taskObject = {
                            name: TaskData.value,
                            completed: false
                        };  
                    
                        data[index].Task.push(taskObject);

                    localStorage.setItem("Data", JSON.stringify(data));

                let OuterCheckTask = document.createElement("div");
                OuterCheckTask.classList.add("OuterCheckTask");
                ContentDiv.appendChild(OuterCheckTask);                    

                let CheckBox = document.createElement("img");
                CheckBox.setAttribute("src","https://img.icons8.com/ios/50/unchecked-checkbox.png");
                CheckBox.setAttribute("style","width:15px;height:15px;margin:10px 0px;");
                CheckBox.classList.add("CheckBox");
                OuterCheckTask.appendChild(CheckBox);

                CheckBox.addEventListener("click",function(){
                    if(confirm("TASK COMPLETED! YOU WANT TO REMOVE IT") == true){
                        OuterCheckTask.style.display = "none";
                    }
                })

                let TaskOutputSpan = document.createElement("span");
                TaskOutputSpan.classList.add("TaskOutputSpan");
                OuterCheckTask.appendChild(TaskOutputSpan);
                TaskOutputSpan.textContent = TaskData.value;

                TaskData.value = ""; 
                }
            }
            });     
            

            });
        
        DeleteAllNotes.addEventListener("click",function(){
            if(confirm("Are You Sure Want To Delete All Records") === true){
                localStorage.clear("Data");
                location.reload();
            }
        });
        
        X.addEventListener("click",function(){
            OuterMainDiv.style.display = "none";
                RightDiv.innerHTML = OriginalContente;
        });

            
        });


    }
});
