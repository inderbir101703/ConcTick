export const natsWrapper = {
    client: {
      publish: jest.fn().mockImplementation((subject:string,sata:string,callback:()=>void)=>{
   callback()
      })
    },
  };
  