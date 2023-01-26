const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('TransactionContract', function (){
    let tcontract;
    let owner;
    let TContract;

    beforeEach(async function(){
        TContract = await ethers.getContractFactory('TransactionContract');
        [owner] = await ethers.getSigners();
        tcontract = await TContract.deploy();
    });

    describe ("initialized", function(){
        it("Should initialize new users", async function(){
            await expect(await tcontract.initialize()).to.emit(tcontract, 'AddBalence').withArgs(owner.address,10,10,true);
        });
    });

    describe ("Add Balance", function(){
        it("Should emit AddBalance event", async function(){
            await expect(await tcontract.addBalence(30)).to.emit(tcontract, 'AddBalence').withArgs(owner.address, 30,30, true);
        });
    });

    describe ("Get Balance", function(){
        it("Should return the correct balance", async function(){
            const balanceFromChain = await tcontract.getMyBalence();
            expect(balanceFromChain).to.equal(30);
        });
    });

    describe ("subtract balance success case", function(){
        it("Should emit subtract balance event", async function(){
            await expect(await tcontract.subBalence(10)).to.emit(tcontract, 'SubBalence').withArgs(owner.address, 10,20, true);
        });
    });

    describe ("subtract balance failure failure case", function(){
        it("Should emit subtract balance failure event", async function(){
            await expect(await tcontract.subBalence(100)).to.emit(tcontract, 'SubBalence').withArgs(owner.address, 100,20, false);
        });
    });

    describe ("Transfer Balance ", function(){
        it("Should emit Transfer Balance event success case", async function(){
            await expect(await tcontract.transfer(owner.address,20)).to.emit(tcontract, 'TransferBalence').withArgs(owner.address,owner.address,20,true);
        });
    })

    describe ("Balance after self transfer", function(){
        it("Should return same balance as before", async function(){
            const balanceFromChain = await tcontract.getMyBalence();
            expect(balanceFromChain).to.equal(20);
        });
    })

});