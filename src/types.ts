type SimpleSourceResult = string | number | boolean
type SourceResult =  SimpleSourceResult | SimpleSourceResult[]
type SourceFunction = () => SourceResult | Promise<SourceResult>
export type SourceDict = Record<string, SourceFunction>
export type SourceResultDict = Record<string, Source>

interface Source {
    state: State,
    value: SourceResult
}

export interface Options {
    token: string,
    url: string
}

export interface Result {
    is_bad_bot: string,
    is_good_bot: string,
    inconsistency: string,
    is_vm: string
}

enum State {
    Success = 1,
    Failure = -1,
}

async function handleSource(sourceFunction: SourceFunction): Promise<Source> {
    let sourceResult: SourceResult
    let result: Source
    try {
        sourceResult = await sourceFunction()
        result = { value: sourceResult, state: State.Success}
    }
    catch (e) {
        result = { value: e.toString(), state: State.Failure}
    }
    return result
}

export default async function handleAll(sources: SourceDict): Promise<SourceResultDict> {
    let results: SourceResultDict = {}
    for (let name in sources) {
        if (sources.hasOwnProperty(name)) {
            let sourceFunction = sources[name];
            results[name] = await handleSource(sourceFunction)
        }
    }
    return results
}