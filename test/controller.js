const { expect } = require("chai");
const randomstring = require("randomstring");
const { deployWith, registry, registryWithFallback,
    registrar,
    reverseRegistrar,
    publicResolver,
    baseRegistrarImplementation,
    stablePriceOracle, 
    registrarController
} = require("../scripts/deploy");
 

const namehash = require('eth-ens-namehash');
const tld = "zkf"; 
const labelhash = (label) => ethers.keccak256(ethers.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("Controller Contract", function () {
 
    let domain = "fns";

    it("Should available", async function() {
        const [deployer, user1] = await ethers.getSigners(); 

        await deployWith(deployer);

        const isAvailable = await registrarController.connect(user1).available(domain);
        
        await expect(isAvailable).to.equal(true);
    });
     
    it("Make commitment and should register", async function() {

        const [deployer, user1] = await ethers.getSigners(); 
 
        const secret = labelhash(randomstring.generate(8));
    
        const commitment = await registrarController.connect(user1).makeCommitment(domain, user1.address, 31556926, secret, publicResolver.target, [], true);

        await expect( registrarController.connect(user1).commit(commitment, { from: user1.address })); 
  
        const price = await registrarController.connect(user1).connect(user1).rentPrice(domain, 1);
         
        await sleep(3000); 
        
        await expect( registrarController.connect(user1).register(domain, user1.address, 31556926, secret, publicResolver.target, [], true, { from: user1.address, value: ethers.parseEther("0.25")  }) );

    });

    it("Should not available", async function() {
        const [deployer, user1] = await ethers.getSigners(); 
 
        const isAvailable = await registrarController.connect(user1).available(domain);
        
        await expect(isAvailable).to.equal(false);
    });

    it("Should renew", async function() {

        const [deployer, user1] = await ethers.getSigners(); 
        
        await expect( registrarController.connect(user1).renew(domain, 31556926, { from: user1.address, value: ethers.parseEther("0.25")  }));
    });

    it("Should withdraw by the owner", async function() {

        const [deployer, user1] = await ethers.getSigners(); 
        
        await expect( registrarController.connect(deployer).withdraw() );
    });

    it("Should not withdraw by another address", async function() {

        const [deployer, user1] = await ethers.getSigners(); 
        
        await expect( registrarController.connect(user1).withdraw() ).to.be.reverted;
    });

    it("Should change base uri by the owner", async function() {

        const [deployer, user1] = await ethers.getSigners(); 
        
        await expect( baseRegistrarImplementation.connect(deployer).setBaseUri("http://test.com/") );
    });

    it("Should not change base uri by another address", async function() { 
        
        const [deployer, user1] = await ethers.getSigners(); 

        await expect( baseRegistrarImplementation.connect(user1).setBaseUri("http://test.com/") ).to.be.reverted;
    });
    

     
});


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }