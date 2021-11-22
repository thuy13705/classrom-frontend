function checkTeacher(teacherArr,id){
    console.log(teacherArr);
    for (let i=0; i<teacherArr.length;i++){
        if (id===teacherArr[i]._id){
            return true;
        }
    }
    return false;
}

export default checkTeacher;