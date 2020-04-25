import { Observable } from 'rxjs'

export const fromMap = <K, V>(mapData: Map<K, V>) => (
  new Observable((subscriber) => {
    for (const mapItem of mapData.values()) {
      subscriber.next(mapItem)
    }
    subscriber.complete()
  })
)
