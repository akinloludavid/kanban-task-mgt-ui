import { Grid, GridItem, Skeleton } from '@chakra-ui/react'
import { nanoid } from 'nanoid'

const Loader = () => {
    return (
        <>
            {new Array(6).fill(0).map(_ => (
                <Grid
                    templateColumns={[
                        'repeat(1,1fr)',
                        'repeat(2,1fr)',
                        'repeat(3,1fr)',
                        'repeat(6,1fr)',
                    ]}
                    key={nanoid()}
                    gap='24px'
                    w='100%'
                >
                    {new Array(6).fill(0).map(_ => (
                        <GridItem mb='24px' key={nanoid()}>
                            <Skeleton h='128px' w={['full', '240px']} />
                        </GridItem>
                    ))}
                </Grid>
            ))}
        </>
    )
}

export default Loader
