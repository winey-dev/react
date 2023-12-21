const users = [
    { id: 'admin', name: 'SeungMin Lee', password: 'admin', identities: 'local' },
    { id: 'smlee_from_kakao', name: 'SeungMin Lee', password: 'admin', identities: 'kakao' },
    { id: 'smlee_from_goggle', name: 'SeungMin Lee', password: 'admin', identities: 'goggle' },
]

const getUsers = () => {
    //return users;
    return new Error("not found users");
}

export { getUsers }