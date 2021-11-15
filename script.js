const table = document.querySelector('.table')
const insertModal = document.querySelector('.insert-modal');
const openInsertModal = document.getElementById('openInsertModal');
const openUpdateModal = document.getElementById("openUpdateModal");
const insertDataBtn = document.getElementById('insertData');
const updateModal = document.querySelector('.update-modal');
const updateDataBtn = document.getElementById('updateData');
const removeUpdateModal = document.querySelector('.del-update');
const removeInsertModal = document.querySelector('.del-insert');

const getData = async()=>{
    const res = await fetch("https://otognfmsxrwlfkfnvoer.supabase.co/rest/v1/crud?select=*",{
        method:"GET",
        headers:{
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo"
        }
    })

    const data = await res.json();
    return data;
}

const deleteData=async(id)=>{
    const res = await fetch(`https://otognfmsxrwlfkfnvoer.supabase.co/rest/v1/crud?id=eq.${id}`,{
        method:"DELETE",
        headers:{
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo"
        },
    });
}

const updateData = async(dataE)=>{
    const fname = document.getElementById('updateFname').value;
    const lname = document.getElementById('updateLname').value;
    const email = document.getElementById('updateEmail').value;
    const phone = document.getElementById('updatePhone').value;

    const data = { firstName:fname, lastName:lname, email:email , phone:phone }
    const res = await fetch(`https://otognfmsxrwlfkfnvoer.supabase.co/rest/v1/crud?id=eq.${dataE.id}`,{
        method:"PATCH",
        headers:{
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })

}

const updateDataIntoForm = async(data) =>{

    const fname = document.getElementById('updateFname');
    const lname = document.getElementById('updateLname');
    const email = document.getElementById('updateEmail');
    const phone = document.getElementById('updatePhone');
    
    fname.value = data.firstName;
    lname.value = data.lastName;
    email.value = data.email;
    phone.value = data.phone;

    updateDataBtn.addEventListener('click',async()=>{
        await updateData(data);
        alert("Data successfully updated...");
        location.reload()
    })   
}

const addToDOM = async()=>{

    let datas = await getData();
    datas = datas.reverse();
    datas.forEach(element => {
        const tr = document.createElement("tr");
        tr.innerHTML = `     
    
            <td>${element.id}</td>
            <td>${element.firstName}</td>
            <td>${element.lastName}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            <td><button class="delBtn">Delete</button></td>
            <td><button class="updateBtn">Update</button></td>`

        const delBtn = tr.querySelector('.delBtn');
        const updateBtn = tr.querySelector('.updateBtn');

        delBtn.addEventListener('click',async(e)=>{
            await deleteData(element.id);  
            alert("Data successfully deleted...")
            location.reload()  
        })
        
        updateBtn.addEventListener('click',async(e)=>{
            updateModal.classList.add('active');    
            await updateDataIntoForm(element)
        })
    
        table.appendChild(tr);
    });
    
}

const insertData = async()=>{
    let fname = document.getElementById('insertFname').value;
    let lname = document.getElementById('insertLname').value;
    let email = document.getElementById('insertEmail').value;
    let phone = document.getElementById('insertPhone').value;

    const data = { firstName:fname, lastName:lname, email:email, phone:phone };
    
    const res = await fetch("https://otognfmsxrwlfkfnvoer.supabase.co/rest/v1/crud",{
        method:"POST",
        headers:{
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
}

openInsertModal.addEventListener('click',()=>{
    insertModal.classList.add('active');
})

insertDataBtn.addEventListener('click',async()=>{
    await insertData();
    insertModal.classList.remove('active');
    alert("Data successfully inserted...")
    location.reload();
})

removeInsertModal.addEventListener('click',()=>{
    insertModal.classList.remove('active');
})

removeUpdateModal.addEventListener('click',()=>{
    updateModal.classList.remove('active');
})

addToDOM()