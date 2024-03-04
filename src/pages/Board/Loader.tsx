import { Grid, GridItem, Skeleton } from '@chakra-ui/react'
import { nanoid } from 'nanoid'

const Loader = () => {
    return (
        <>
            <Grid
                templateColumns={'repeat(6,1fr)'}
                key={nanoid()}
                gap='24px'
                w='100%'
            >
                {new Array(6).fill(0).map(_ => (
                    <GridItem mb='24px' key={nanoid()}>
                        <Skeleton h='24px' w='240px' />
                    </GridItem>
                ))}
            </Grid>
            {new Array(6).fill(0).map(_ => (
                <Grid
                    templateColumns={'repeat(6,1fr)'}
                    key={nanoid()}
                    gap='24px'
                    w='100%'
                >
                    {new Array(6).fill(0).map(_ => (
                        <GridItem mb='24px' key={nanoid()}>
                            <Skeleton h='128px' w='240px' />
                        </GridItem>
                    ))}
                </Grid>
            ))}
        </>
    )
}

export default Loader
