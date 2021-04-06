type TSimpleSourceResult = string | number | boolean
type TSourceResult =  TSimpleSourceResult | TSimpleSourceResult[]
type TSourceFunction = () => TSourceResult | Promise<TSourceResult>
export type TSourceDict = Record<string, TSourceFunction>
export type TSourceResultDict = Record<string, ISource>

interface ISource {
    state: EState,
    value: TSourceResult
}

enum EState {
    Success = 1,
    Failure = -1,
}

async function handleSource(sourceFunction: TSourceFunction): Promise<ISource> {
    let sourceResult: TSourceResult
    let result: ISource
    try {
        sourceResult = await sourceFunction()
        result = { value: sourceResult, state: EState.Success}
    }
    catch (e) {
        result = { value: e.toString(), state: EState.Failure}
    }
    return result
}

export default async function handleAll(sources: TSourceDict): Promise<TSourceResultDict> {
    let results: TSourceResultDict = {}
    for (let name in sources) {
        if (sources.hasOwnProperty(name)) {
            let sourceFunction = sources[name];
            results[name] = await handleSource(sourceFunction)
        }
    }
    return results
}