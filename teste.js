var user = [
    {
        "nome":"luiz",
        "idade":25,
        "job":"engenheiro"
    },
    {
        "nome":"João",
        "idade":35,
        "job":"médico"
    },
    {
        "nome":"Paula",
        "idade":46,
        "job":"dançarina"
    }
]

console.log(`tamanho do array: ${user.length}`)
var y = user.forEach((x)=>{
    console.log(x.idade)
    console.log(x.nome)
    console.log(x.job)
})

for(item of user){
console.log(item)
}
for(var i=0; i<user.length; i++){
    console.log(user[i])
}

