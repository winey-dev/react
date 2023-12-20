const pathnames = [
    '/home',
    "/administration/users",
    "/administration/users/create",
    "/administration/users/update",
    "/administration/users/0"
]


const ParseHome = (elements) => {
    console.log('home', elements)
}

const ParseAdministartion = (elements) => {
    console.log('admin', elements)
}

const ParseDefault = (elements) => {
    console.log('def', elements)
}

pathnames.forEach((pathname) => {
    const elements = pathname.split('/')
    console.log(elements)
    // if (elements.length < 2) {
    //     throw new Error("not path format ... input=", pathname)
    // }
    switch (elements[1]) {
        case 'home':
            ParseHome(elements)
            break
        case 'administration':
            ParseAdministartion(elements)

            break
        default:
            ParseDefault(elements)
            break
    }
})