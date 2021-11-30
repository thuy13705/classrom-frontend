function checkTeacher(teacherArr,id){
    for (let i=0; i<teacherArr.length;i++){
        if (id===teacherArr[i]._id){
            return true;
        }
    }
    return false;
}

export default checkTeacher;