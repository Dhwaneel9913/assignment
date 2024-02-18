const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        login: async (_, { username, password }) => {
            // Find the user by username
            const user = await User.findOne({ username });
            if (!user) {
              throw new Error('User not found');
            }
        
            // Check if the password is correct
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
              throw new Error('Invalid password');
            }
        
            // Return the user
            return user;
          },
        
      getAllEmployees: async () => {
        getAllEmployees: async () => {
            // Find all employees
            const employees = await Employee.find();
            return employees;
          }},
      getEmployeeById: async (_, { _id }) => {
        getEmployeeById: async (_, { _id }) => {
            // Find the employee by _id
            const employee = await Employee.findById(_id);
            if (!employee) {
              throw new Error('Employee not found');
            }
        
            return employee;
          }
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            try {
                 // Check if a user with the given username or email already exists
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
              throw new Error('User already exists');
            }
        
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create a new user
            const user = new User({
              username,
              email,
              password: hashedPassword,
            });
        
            // Save the user to the database
            await user.save();
        
            return user;   
            } catch (error) {
                console.error('Error during signup:', error);
                throw error;
              
            }
            
      },
      addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
        addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
            // Check if an employee with the given email already exists
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
              throw new Error('Employee already exists');
            }
        
            // Create a new employee
            const employee = new Employee({
              first_name,
              last_name,
              email,
              gender,
              salary,
            });
        
            // Save the employee to the database
            await employee.save();
        
            return employee;
          }
        },
      updateEmployee: async (_, { _id, first_name, last_name, email, gender, salary }) => {
        updateEmployee: async (_, { _id, first_name, last_name, email, gender, salary }) => {
            // Find the employee by _id
            const employee = await Employee.findById(_id);
            if (!employee) {
              throw new Error('Employee not found');
            }
        
            // Update the employee details
            if (first_name) employee.first_name = first_name;
            if (last_name) employee.last_name = last_name;
            if (email) employee.email = email;
            if (gender) employee.gender = gender;
            if (salary) employee.salary = salary;
        
            // Save the updated employee to the database
            await employee.save();
        
            return employee;
          }},
      deleteEmployee: async (_, { _id }) => {
        const employee = await Employee.findByIdAndDelete(_id);
    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  },
},}}