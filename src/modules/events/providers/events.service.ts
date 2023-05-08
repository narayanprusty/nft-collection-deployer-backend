import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventRo } from '../ro/event.ro';
import { ethers } from "ethers";

@Injectable()
export class EventsService {
  private events:EventRo[]

  constructor(
    private configService: ConfigService,
  ) {
    this.events = []
    this.watchEvents()
  }

  async geEvents(): Promise<EventRo[]> {
    return this.events;
  }

  async watchEvents() {
    const provider = new ethers.JsonRpcProvider(this.configService.get('rpcURL')) 
    const collectionDeployerContract = new ethers.Contract(this.configService.get('collectionDeployerAddress'), this.configService.get('collectionDeployerABI'), provider);
    
    await provider.on("block", async (blockNumber) => {
      const collectionCreatedEvent = await collectionDeployerContract.queryFilter(
        "CollectionCreated",
        blockNumber,
        blockNumber
      );

      collectionCreatedEvent.forEach(event => {
        this.events.push({
          collection: event['args'][0],
          name: event['args'][1],
          symbol: event['args'][2],
          eventName: "CollectionCreated"
        })
      })

      const tokenMintedEvent = await collectionDeployerContract.queryFilter(
        "TokenMinted",
        blockNumber,
        blockNumber
      );

      tokenMintedEvent.forEach(event => {
        this.events.push({
          collection: event['args'][0],
          recipient: event['args'][1],
          tokenId: Number(event['args'][2]),
          tokenURI: event['args'][3],
          eventName: "TokenMinted"
        })
      })
    });
  }
}