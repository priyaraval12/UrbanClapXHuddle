// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UrbanClapXHuddle{
    uint public workerId = 0;
    uint public usersId = 0;
    uint public appointmentsId = 0;

    struct Worker{
        uint id;
        string name;
        string pfp;
        string category;
        address workerWallet;
        string description;
        uint price;
        uint rating;
        string meetingLink;
        bool isAvailable;
        uint numberOfRaters;
    }

    struct User{
        uint id;
        string username;
        address userWallet;
    }

    struct Appointment{
        uint id;
        address customer;
        address worker;
    }

    mapping (uint => Worker) public workers;
    mapping (address => Worker) public workerAddressMap;
    mapping (uint => User) public users;
    mapping (address => string) public userNames;
    mapping(address => bool) public userExistsMap;
    mapping(address => bool) public workerExistsMap;

    mapping(address => Appointment[]) public appointmentsForWorker;

    function addWorker(string memory _name, string memory _category,
     string memory _description, string memory _pfpUri,
      uint _price, uint _rating, 
      string memory _meetingLink, bool _availability) public {
        require(userExistsMap[msg.sender] == true, "User doesn't exists");
        workers[workerId] = Worker(workerId, _name,_pfpUri, _category, msg.sender,
         _description, _price, _rating,_meetingLink, _availability, 0);
        workerExistsMap[msg.sender] = true;
        workerAddressMap[msg.sender] = workers[workerId];
        workerId +=1;
    }

    function addUser(string memory _name) public{
        require(userExistsMap[msg.sender] == false, "User already exists");
        users[usersId] = User(usersId, _name, msg.sender);
        userNames[msg.sender] = _name;
        userExistsMap[msg.sender] = true;
        usersId += 1;
    }

      function addAppointment(uint _workerId, uint _price) public payable{
        address workerAddress = getWorkerAddress(_workerId);
        require(msg.value == _price, "Wrong amount");
        require(workerAddress != msg.sender, "You can't schedule a call with yourself");
        Appointment memory appointment = Appointment(appointmentsId, msg.sender, workerAddress);
        appointmentsId += 1;
        appointmentsForWorker[workerAddress].push(appointment);
    }

    function changeAvailability(address _workerAddress) public {
        Worker storage worker = workerAddressMap[_workerAddress];
        uint _workerId = worker.id;
        workers[_workerId].isAvailable = !workers[_workerId].isAvailable;
        workerAddressMap[_workerAddress].isAvailable = !workerAddressMap[_workerAddress].isAvailable;
    }

    function changePrice(uint _id, uint _price) public {
        Worker storage worker = workers[_id];
        require(worker.workerWallet == msg.sender, "You are not authorized to do this");
        worker.price = _price;
    }

    function rateWorker(address _worker, uint _rate) public {
        require(_worker != msg.sender, "You can't rate yourself");
       
        Worker storage worker = workerAddressMap[_worker];
        uint _workerId = worker.id;
        uint rating = worker.rating;
        uint numberRaters = worker.numberOfRaters;
        rating += _rate;
        numberRaters +=1 ;
        workers[_workerId].rating = rating;
        workers[_workerId].numberOfRaters = numberRaters;
        workerAddressMap[_worker].rating += rating;
        workerAddressMap[_worker].numberOfRaters = numberRaters;
    }

    function getWorkerAddress(uint _workerId) view public returns (address) {
        address workerAddress = workers[_workerId].workerWallet;
        return workerAddress;
    }

    function getWorker(uint _id) view public returns(Worker memory){
        return workers[_id];
    }
    
    function getWorkerByAddress(address _workerAddress) view public returns(Worker memory){
        return workerAddressMap[_workerAddress];
    }
    function getUser(uint _id) view public returns(User memory){
        return users[_id];
    }

    function getUsername() view public returns(string memory){
        return userNames[msg.sender];
    }

    function getAppointmentForAWorker(address _addressWorker) view public returns(Appointment[] memory){
        return appointmentsForWorker[_addressWorker];
    } 

    function getWorkerRating(uint _id) view public returns(uint){
        return workers[_id].rating;
    }

    
    function checkUserExists() view public returns(bool){
        if(userExistsMap[msg.sender] == true){
            return true;
        }else{
            return false;
        }
    }

     function checkWorkerExists() view public returns(bool){
        if(workerExistsMap[msg.sender] == true){
            return true;
        }else{
            return false;
        }
    }
}